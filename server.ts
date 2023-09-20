import app from './src/index'
import * as cron from 'node-cron';
import borrowModel from './src/models/borrowBook.model'
const port: string = process.env.PORT || '3000'


cron.schedule('0 0 * * *', async () => { // Chạy vào mỗi ngày lúc 00:00:00
  const currentDate = new Date();

  // Tìm tất cả các tài liệu có trạng thái "đang mượn" và ngày trả dự kiến nhỏ hơn ngày hiện tại
  const overdueBooks = await borrowModel.find({ status: 'borrowed', returnDate: { $lt: currentDate } });

  // Cập nhật trạng thái của các tài liệu "quá hạn"
  for (const book of overdueBooks) {
    book.status = 'due';
    await book.save();
  }
});

app.listen(port, (err?: Error | null) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
