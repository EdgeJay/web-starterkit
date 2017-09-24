export default class LandingController {
  static async getLanding(ctx) {
    await ctx.render('index');
  }

  static async getHello(ctx) {
    ctx.body = 'Hello!';
    ctx.type = 'html';
  }
}
