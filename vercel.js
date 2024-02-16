{
    "version": 2,
    "builds": [{"src": "./index.js", "use": "@vercel/nodemon","config": {"engine": "18.x"}}],
    "routes": [{"src": "^/(.*)", "dest": "/"}] 
}