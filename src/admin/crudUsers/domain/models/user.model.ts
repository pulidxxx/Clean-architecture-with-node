export class UserEntity {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public rolId: number,
    public img?: string
  ) {}
}
