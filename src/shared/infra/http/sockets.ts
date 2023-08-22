import { Server } from "socket.io";

export default async (io: Server) => {
    io.on("connection", (socket) => {
        // enter in match room
        socket.on("client:join_room", (data) => {
            const room = `match:${data.message}`;
            socket.join(room);
            socket.emit("server:join_room", { message: `${socket.id} user joined room: ${room}` });
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
        })
    });
};
