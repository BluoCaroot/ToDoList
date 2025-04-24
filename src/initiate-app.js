import db_connection from "../DB/connection.js"
import { globalResponse } from "./middlewares/global-response.middleware.js"

import * as  routers from './modules/index.routes.js'


export const initiateApp = (app, express) => {

    const port = process.env.PORT


    app.use(express.json())

    db_connection()
    app.use('/auth', routers.authRouter)
    app.use('/user', routers.userRouter)
    app.use('/task', routers.taskRouter)
    app.use((req, res) => {
        res.status(404).json({ message: 'Not Found' });
      });      
    app.use(globalResponse)
    app.listen(port, () => console.log(`server started on port ${port}`))

}