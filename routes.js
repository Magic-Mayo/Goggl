import express from 'express';
const path = '/home/pi/projects';

export const routes = app => {
    app.use(express.static('client/build/static'));
    app.get('/', (req, res) => res.sendFile(`${path}/Goggl/client/build/index.html`));
}