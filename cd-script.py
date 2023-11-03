import paramiko
import sys, getopt
host = ''
username = ''
password = ''
port= 22
project_name='BirdCageAdmin'
def get_passed_arguments() :
    argv = sys.argv [ 1: ] 
    global host, username, password, port
    host = argv[0]
    username = argv[1]
    password = argv[2]
    port = int(argv[3])

def execute_commands(command) : 
    ssh = paramiko.SSHClient()

    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    ssh.connect(host, username=username, password=password, port=port)

    stdin, stdout, stderr = ssh.exec_command(command)

    output = stdout.read().decode('utf-8')

    print(output)

get_passed_arguments()
execute_commands('cd ~/BirdCageAdmin' + project_name + '\ngit pull')