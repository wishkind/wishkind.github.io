import tornado.web 
import tornado.ioloop
import tornado.gen
import tornado.httpserver
from tornado.options import define, options
import tornado.websocket
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')
    def post(self):
        body = self.request.body
        self.write("gg")



class Application(tornado.web.Application):
     def __init__(self):
        super(Application, self).__init__([(r'/', MainHandler),
                (r'/(.*)', tornado.web.StaticFileHandler,{
                "path":os.path.join(os.path.dirname('__file__'), 'statics'),
                "default_filename": "index.htm;"})                                            ], 
                static_path = os.path.join(os.path.dirname('__file__'), './'),
                template_path = os.path.join(os.path.dirname('__file__'), './'),
                debug = True,
                gzip=True,
                cookie_secret = "hello",
                xsrf_cookies = True)

define('port', default=3600, help='port', type=int)
def main():
    options.parse_command_line()
    app = Application()
    app.listen(options.port)
    print("is running at 3600")
    tornado.ioloop.IOLoop.current().start()


if __name__ =='__main__':
    main()
