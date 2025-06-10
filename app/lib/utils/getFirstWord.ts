export default function getFirstWord(input:string = ""): string{
    return input.trim().split(/\s+/)[0] || "";    
}