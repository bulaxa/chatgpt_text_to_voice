export default interface IApiInterface {
  request(content: any): Promise<any>;
}
