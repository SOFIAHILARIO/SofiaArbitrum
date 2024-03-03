import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x6440768C26C93f2b82fA761E754c257078021ECC",
        abi as any,
        signer
    );
}