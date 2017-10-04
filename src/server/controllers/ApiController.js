export default class ApiController {
  static async postValidateCSRF(ctx) {
    ctx.json({
      body: {
        validated: true,
      },
    });
  }
}
