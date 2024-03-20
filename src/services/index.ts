import { NasaService } from "./nasa/nasa.service";
import { NasaServiceImpl } from "./nasa/impl/nasa.service.impl";
import { nasaClient } from "../clients";
import { UserServiceInterface } from "./user/user.service.interface";
import { UserServiceImpl } from "./user/impl/user.service.impl";

export const nasaService: NasaService = new NasaServiceImpl(nasaClient);
export const userService: UserServiceInterface = new UserServiceImpl();
