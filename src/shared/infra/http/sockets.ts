import { Server } from "socket.io";

export default async (io: Server) => {
    io.on("connection", (socket) => {
        /* Tournament section */

        /*
         * @param
         * message is de matchId
         * data: { message: string }
         *
         * creates the room and emmit a
         * message with the socket id that just connect to the room
         * */
        socket.on("client:join_tournament_room", (data) => {
            console.log(`New room created ${data.message}`);

            const room = `match:${data.message}`;
            socket.join(room);

            socket
                .to(room)
                .emit("server:join_tournament_room", {
                    message: `${socket.id} user joined room: ${room}`,
                });
        });

        /*
         * @param
         * data: tournamentMatch
         *
         * Receive the match data from the tracker and send it back to watchers
         * */
        socket.on("client:update_tournament_match", (data) => {
            console.log(`update_match ${data}`);
            const matchId = data.matchId;

            const room = `match:${matchId}`;
            socket.to(room).emit("server:update_tournament_match", data);
        });


        /*
         * @param
         * message is de matchId
         * data: { message: string }
         *
         * When tracker finish the transmition, it notifies to watchers
         * */
        socket.on("client:tournament_match_finish", (data) => {
            const room = `tournament_match:${data.message}`;
            socket.to(room).emit("server:tournament_match_finish");
        });
        /* End Tournament section */

        /* League match section */
        // enter in match room
        socket.on("client:join_room", (data) => {
            const room = `match:${data.message}`;
            socket.join(room);
            socket
                .to(room)
                .emit("server:join_room", {
                    message: `${socket.id} user joined room: ${room}`,
                });
        });

        // notify actualization
        socket.on("client:update_match", (data) => {
            const matchId = data.matchId;

            const room = `match:${matchId}`;
            socket.to(room).emit("server:update_match", data);
        });

        socket.on("client:match_finish", (data) => {
            const room = `match:${data.message}`;
            socket.to(room).emit("server:match_finish");
        });
        /* League match section */
    });
};
