// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    if (req.method === "POST") {

        const response = await fetch(`${process.env.ENDPOINT}/login`,{
            method : "POST",
            body : JSON.stringify(req.body),
            headers: req.headers
        });

        const result = await response.json();

        res.status(response.status).json(result);

    }
}
