// login.ts
export default class login {
    public email: string;
    private password: string;
  
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  
    getemail(): string {
      return this.email;
    }
  
    setemail(email: string): void {
      this.email = email;
    }
  
    getpassword(): string {
      return this.password;
    }
  
    setpassword(password: string): void {
      this.password = password;
    }
  }
  