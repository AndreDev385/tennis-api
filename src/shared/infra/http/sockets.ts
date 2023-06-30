import { Server } from "socket.io";

export default async (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`user ${socket.id} connected`);
        let matchs = [
            { matchId: 1, points: 0 },
            { matchId: 2, points: 0 },
        ];

        socket.on("client:join_room", (matchId) => {
            const room = `match:${matchId}`;
            socket.join(room);
            socket.emit("server:join_room", room);
        });

        socket.on("client:update_match", (data) => {
            // update match
            matchs = matchs.map((m) => {
                if (m.matchId === data.matchId) {
                    m.points = data.points;
                }
                return m;
            });

            const room = `match:${data.matchId}`;
            socket.to(room).emit("server:update_match", data);
        });

        socket.on("client:listen_match", (matchId) => {
            const match = matchs.find((m) => m.matchId == matchId);

            const room = `match:${matchId}`;
            socket.to(room).emit("server:update_match", match);
        });
    });
};
