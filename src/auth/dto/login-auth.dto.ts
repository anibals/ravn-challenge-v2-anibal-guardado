import { MaxLength, MinLength } from "@nestjs/class-validator";
export class LoginAuthDto {
    
    username:string
    @MinLength(5)
    @MaxLength(20)
    password:String
    
}
