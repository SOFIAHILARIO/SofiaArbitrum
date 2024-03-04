import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xAb73cbE4c344B55f8ed25e6255aCA0fb54979324",
        abi as any,
        signer
    );
}