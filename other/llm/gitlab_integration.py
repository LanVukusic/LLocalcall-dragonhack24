import gitlab
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage
import json
import numpy as np
from http.server import BaseHTTPRequest, HTTPServer
from urllib.parse import urlparse, parse_qs

model = ChatOllama(model='llama3', base_url='http://zaanimivo.xyz:11434', temperature=0, stop=['<|eot_id|>'])

# Set up your GitLab API credentials
gl = gitlab.Gitlab(url='https://gitlab.com')

project_ids = [3472737, 10582521, 36189, 10174980, 10858056, 6922885, 252461,
              4207231, 10382875, 7898047, 15462818]

meeting = '''
[00:05] Alex: Alright everyone, let's get started on today's agenda. We've got a couple of Inkscape issues to tackle, as 
well as some updates on our new team member.

[00:10] Sarah: Oh, yeah! I'm so excited to hear more about Tom. He seems really nice.

[00:15] John: Yeah, he's been doing great so far. Although, I have to say, his coffee mug is kinda... unusual.

[00:20] Alex: [laughs] Well, we'll get to Tom in a minute. So, our first issue is still the object picker tool. It's just 
not very user-friendly, you know?

[00:30] Sarah: Right? I mean, I've been trying to use it to select some shapes and it just keeps jumping around on me.

[00:35] John: And don't even get me started on the lack of title text! How are we supposed to know what tool is active if it
doesn't tell us?

[00:40] Alex: Yeah, those are some good points. So, let's brainstorm some solutions for this issue.

[00:50] Sarah: I think maybe if we had a dropdown menu or something... you know, like in other design apps?

[01:00] John: That could work! And maybe we could add a little indicator icon to show when the tool is active?

[01:05] Alex: Yeah, that sounds like a good idea. We can definitely look into that.

[01:10] Sarah: Okay, got it. So, what's the status on Tom? How's he fitting in with the team?

[01:15] John: He seems really eager to learn and help out. Although, I did notice he was struggling a bit with our project 
management tool... does anyone know how to use that thing?

[01:20] Alex: [laughs] Yeah, it can be a little tricky at first. But don't worry, we'll get him up to speed in no time.

[01:25] Sarah: I'm sure he'll figure it out. So, what's the plan for our next meeting? Are we going to tackle that Live 
Preview issue?

[01:30] Alex: Yeah, let's make a note to look into that too. And maybe we can even get Tom involved and hear his thoughts on
the issues.

[fluffy conversation about Tom ensues]
'''

project = gl.projects.get(project_ids[0])
issues = project.issues.list(iterator=True, state='opened')
issues = [next(issues) for _ in range(40)]
# print(issues)

prompt = ChatPromptTemplate.from_template(
'''
You are a helpful AI, that reads meeting transcripts from a software 
development company. Your job is to summerize the metting,
and find out which issues they were talking about.
Here are the current open issues and their ids: 
[{issues}]
Pick only those, that you are sure are discussed in the following
meeting. Don't mention issues not included in the meeting.
Here is the meeting transcript: 
{meeting}
First write a quick summary, and then write which issue/issues
it relates to.
''')

# prompt.format(issues=', '.join(issues))

chain = prompt | model | StrOutputParser()


class MyRequestHandler(BaseHTTPRequest):
    # Handle POST requests
    def do_POST(self):
        # Get the length of the content
        content_length = int(self.headers['Content-Length'])
        
        # Read and decode the request body
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        # Parse the JSON data from the request body
        data = json.loads(post_data)
        
        # Extract the value of the 'name' key
        meeting = data.get('transcription', 'nema')
        
        # Send response status code
        self.send_response(200)
        
        # Send headers
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        llm_response = ''
        for chunks in chain.stream({"issues": ', '.join([issue.title + ' (' + str(issue.iid) + ')' for issue in issues]), "meeting": meeting}):
            llm_response += chunks
        
        # Prepare the response data
        response_data = '{"response": "' + llm_response + '"}'
        
        # Send the response data as JSON
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

def run_server():
    server_address = ('', 1234)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print("Starting server...")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()

