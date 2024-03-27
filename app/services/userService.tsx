import constants from "constants.json"
import BaseResponse from "../Contracts/Responses/BaseResponse"
import { accessToken, userId } from "~/utils/userUtils";
import Fetch from "~/utils/fetchUtils";

export interface StartUploadModelRequest {
    userId:string;
    modelName:string;
};

export interface StartUploadModelResponse extends BaseResponse {
    id:string;
};

export async function StartUploadModel(requestBody: StartUploadModelRequest) : Promise<StartUploadModelResponse> {
    try 
    {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

        // 👇️ const response: Response
        const response = await Fetch(constants.url + "user/models/upload", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            Authorization: "Bearer " + accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
    
        if (!response.ok) 
        {
            let result = {} as StartUploadModelResponse;
            result.statusCode = response.status;
            result.message = "Status Error";
            result.success = false;

            return result;
        }

        let result = await response.json() as StartUploadModelResponse; 
        result.statusCode = response.status;
        
        console.log('result is: ', JSON.stringify(result, null, 4));
    
        return result;
    } 
    catch (error) 
    {
        let result = {} as StartUploadModelResponse;
        result.success = false;
        
        if (error instanceof Error) 
        {
          console.log('error message: ', error.message);
          result.message = error.message;
        } 
        else 
        {
          console.log('unexpected error: ', error);
          result.message = 'unexpected error: ' + error;
        }

        return result;
    }
}

export interface OnModelUploadedRequest {
    userId:String;
    modelId:String;
    size: Number
};

export async function OnModelUploaded(requestBody: OnModelUploadedRequest) : Promise<BaseResponse> {
    try 
    {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

        // 👇️ const response: Response
        const response = await Fetch(constants.url + "user/models/uploaded", {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            Authorization: "Bearer " + accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
    
        if (!response.ok) 
        {
            let result = {} as BaseResponse;
            result.statusCode = response.status;
            result.message = "Status Error";
            result.success = false;

            return result;
        }

        let result = await response.json() as BaseResponse; 
        result.statusCode = response.status;
        
        console.log('result is: ', JSON.stringify(result, null, 4));
    
        return result;
    } 
    catch (error) 
    {
        let result = {} as BaseResponse;
        result.success = false;
        
        if (error instanceof Error) 
        {
          console.log('error message: ', error.message);
          result.message = error.message;
        } 
        else 
        {
          console.log('unexpected error: ', error);
          result.message = 'unexpected error: ' + error;
        }

        return result;
    }
}

export interface IsModelNameExistResponse extends BaseResponse {
    isNameTaken:boolean
};

export async function IsModelNameExist(requestBody: StartUploadModelRequest) : Promise<IsModelNameExistResponse> {
  try 
  {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

      // 👇️ const response: Response
      const response = await Fetch(constants.url + "user/models/isModelNameExist", {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          Authorization: "Bearer " + accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) 
      {
          let result = {} as IsModelNameExistResponse;
          result.statusCode = response.status;
          result.message = "Status Error";
          result.success = false;

          return result;
      }

      let result = await response.json() as IsModelNameExistResponse; 
      result.statusCode = response.status;
      
      console.log('result is: ', JSON.stringify(result, null, 4));
  
      return result;
  } 
  catch (error) 
  {
      let result = {} as IsModelNameExistResponse;
      result.success = false;
      
      if (error instanceof Error) 
      {
        console.log('error message: ', error.message);
        result.message = error.message;
      } 
      else 
      {
        console.log('unexpected error: ', error);
        result.message = 'unexpected error: ' + error;
      }

      return result;
  }
}

export interface FetchAllModelsResponse extends BaseResponse {
  models:Model[];
};

export interface Model{
  id:string;
  name:string;
  createTime:Date;
  fileSize:Number
}

export async function FetchAllModels() : Promise<FetchAllModelsResponse> {
  try 
  {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

      // 👇️ const response: Response
      const response = await Fetch(constants.url + "user/models", {
        method: 'GET',
        headers: {
          Authorization: "Bearer " + accessToken,
          userId: userId,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) 
      {
          let result = {} as FetchAllModelsResponse;
          result.statusCode = response.status;
          result.message = "Status Error " + response.status;
          result.success = false;

          return result;
      }

      let result = await response.json() as FetchAllModelsResponse; 
      result.statusCode = response.status;
      
      console.log('result is: ', JSON.stringify(result, null, 4));
  
      return result;
  } 
  catch (error) 
  {
      let result = {} as FetchAllModelsResponse;
      result.success = false;
      
      if (error instanceof Error) 
      {
        console.log('error message: ', error.message);
        result.message = error.message;
      } 
      else 
      {
        console.log('unexpected error: ', error);
        result.message = 'unexpected error: ' + error;
      }

      return result;
  }
}