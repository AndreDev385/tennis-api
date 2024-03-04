import { sendProvisionalPassword } from "../useCases/sendProvisionalPassword";
import { AfterProvisionalPasswordGranted } from "./afterProvisionalPasswordGranted";

new AfterProvisionalPasswordGranted(sendProvisionalPassword)
