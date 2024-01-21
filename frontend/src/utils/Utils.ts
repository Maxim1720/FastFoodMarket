
export const rewriteUrl=(url: string):string=>{
    return url.replace("http://localhost:8080", "/api");
}