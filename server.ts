import app from './src/index'
import * as cron from 'node-cron';
import BorrowModel from './src/models/borrowBook.model'
import { Server } from "socket.io";
import http from "http";
import mongoose from 'mongoose';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods:['GET','POST']
  }
})

const port: string = process.env.PORT || '3000'

cron.schedule('0 0 * * *', async () => { // Chạy vào mỗi ngày lúc 00:00:00
  const currentDate = new Date();

  // Tìm tất cả các tài liệu có trạng thái "đang mượn" và ngày trả dự kiến nhỏ hơn ngày hiện tại
  const overdueBooks = await BorrowModel.find({ status: 'borrowed', returnDate: { $lt: currentDate } });

  // Cập nhật trạng thái của các tài liệu "quá hạn"
  for (const book of overdueBooks) {
    book.status = 'due';
    await book.save();
  }
});
io.on('connection', (socket) => {
  console.log('A user connected');

  const changeStream = BorrowModel.watch();
  changeStream.on('change', (change) => {
    socket.emit('data-change', change);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
