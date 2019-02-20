interface IParameter {
    Name: string;
    Type: "string" | "number";
    Example: string;
    Description?: string;
}

interface IRequest {
    Endpoint: string;
    Method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    Parameters: IParameter[];
}

interface IResponse {
    Redirect?: string;
    Body?: any;
}

export interface IControllerInfo {
    Name: string;
    Category: string;
    Description: string;
    Request: IRequest;
    Response: IResponse;
}

export interface IControllers {
    Controllers: IControllerInfo[];
}
