CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO reports (title, summary, author) VALUES
('Monthly Sales Report', 'Summary of sales for the month including trends and forecasts.', 'Jane Doe'),
('Website Traffic Analysis', 'Report on visitor statistics and behavior.', 'John Smith'),
('Product Launch Plan', 'Detailed plan for upcoming product launch activities.', 'Alice Johnson');
