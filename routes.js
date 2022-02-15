import express from 'express';
const path = '/home/pi/projects';

export const routes = app => {
    app.use(express.static('build'))
    app.get('*', (req, res) => res.sendFile(`${path}/Goggl/public/index.html`));
}