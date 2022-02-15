import express from 'express';
const path = '/home/pi/projects';

export const routes = app => {
    app.use(express.static())
    app.get('*', (req, res) => res.sendFile(`${path}/goggl/public/index.html`));
}