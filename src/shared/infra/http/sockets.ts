import { Server } from "socket.io";

export default async (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`user ${socket.id} connected`);
        let match = { matchId: 1, points: 0 };

        // enter in match room
        socket.on("client:join_room", (matchId) => {
            const room = `match:${matchId}`;
            socket.join(room);
        });

        // notify actualization
        socket.on("client:update_match", (data) => {
            match = data;

            const room = `match:${data.matchId}`;
            socket.to(room).emit("server:update_match", data);
        });

        // get match by id
        socket.on("client:listen_match", (matchId) => {
            socket.emit("server:listen_match", match);
        });
    });
};
