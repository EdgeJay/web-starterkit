import React from 'react';
import ReactDOM from 'react-dom/server';
import Hello from '../../client/components/Hello';

export default class LandingController {
  static async getLanding(ctx) {
    const app = ReactDOM.renderToString(<Hello />);

    await ctx.render('index', {
      app,
    });
  }

  static async getHello(ctx) {
    ctx.body = 'Hello!';
    ctx.type = 'html';
  }
}
