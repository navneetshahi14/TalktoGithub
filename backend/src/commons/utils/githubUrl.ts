export const parseGithubUrl = (url: string) =>{
    try{

        const parsed = new URL(url);

        if(parsed.hostname !== "github.com") return null

        const [owner, repo] = parsed.pathname.replace("/","").split("/")

        if(!owner || !repo) return null

        return {owner,repo}

    }catch{
        return null
    }
}