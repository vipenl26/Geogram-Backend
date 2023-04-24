import "https://deno.land/x/dotenv/load.ts"
import server from "./graphql/server.ts";





server.listenAndServe();

// const app = express()
// app.use(express.json())

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("Welcome to the Dinosaur PPI!")
// });

// app.listen(PORT);