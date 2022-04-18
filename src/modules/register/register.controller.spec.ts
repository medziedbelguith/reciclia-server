import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRegister } from './model/user-register';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

describe('RegisterController', () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('given user validation register,when name is empty,then return error 400',done=>{
    const userRegister=createUserRegister();
    userRegister.name="";
    validateFail(userRegister,done);
  })
  it('given user validation register,when email is empty,then return error 400',done=>{
   
    const userRegister=createUserRegister();
    userRegister.email="";
    validateFail(userRegister,done);
     
  })
  it('given user validation register,when email is invalid,then return error 400',done=>{
   
    const userRegister=createUserRegister();
    userRegister.email="invalid";
    validateFail(userRegister,done);
     
  })
  it('given user validation register,when password is empty,then return error 400',done=>{
   
    const userRegister=createUserRegister();
    userRegister.password="";
    validateFail(userRegister,done);
     
  })
  it('given user validation register,when password is less than 6 characters,then return error 400',done=>{
   
    const userRegister=createUserRegister();
    userRegister.password="12345";
    validateFail(userRegister,done);
     
  })

 it('given user validation register,when phone is empty,then return error 400',done=>{
 
  const userRegister=createUserRegister();
  userRegister.phone="";
  validateFail(userRegister,done);
   
 })
 it('given user validation register,when phone is invalid,then return error 400',done=>{
 
  const userRegister=createUserRegister();
  userRegister.phone="invalid";
  validateFail(userRegister,done);
   
 })
  function validateFail(userRegister:UserRegister,done:any)
  {
    validate(userRegister).catch(error=>{
      expect(error.getResponse().statusCode).toEqual(400);
      done();
    });

  }
  function validate(userRegister:UserRegister)
  {
    const validationPipe=new ValidationPipe({transform:true});
    return validationPipe.transform(userRegister,{
      type:"body",
      metatype:UserRegister
      })
  }
  function createUserRegister(){
    return{
        name:"any name",
        email:"anyemail.com",
        password:"short",
        phone:"12345678",
        address:{
          address:"any address",
          number:"any number",
          neighborhood:"any neighborhood",
          complement:"any complement",
          zipCode:"12345678",
          state:"ST",
          city:"any city"
        }
      };
    
    }
});
