computerClub = db.getSiblingDB("computerClub");
computerClub.computers.insertMany(
	[{
		"_id": {
			"$oid": "66478c76ba3359ab18c800ad"
		},
		"processor": "Intel Core I5",
		"graphics": "RX 580",
		"memory": "16gb",
		"ssd": "256gb"
	},
	{
		"_id": {
			"$oid": "66478cdbba3359ab18c800ae"
		},
		"processor": "Intel Core I3",
		"graphics": "gt 1660",
		"memory": "32gb",
		"ssd": "512gb"
	},
	{
		"_id": {
			"$oid": "66478cf2ba3359ab18c800af"
		},
		"processor": "Intel Core I7",
		"graphics": "rtx 3060",
		"memory": "32gb",
		"ssd": "1024gb"
	},
	{
		"_id": {
			"$oid": "6647d01752e1b72ec38798f1"
		},
		"processor": "Ryzen 3",
		"graphics": "Rx 580",
		"memory": "8GB",
		"ssd": "256GB",
		"_class": "org.example.models.Computer"
	}]
);

computerClub.employyes.insertMany(
	[{
		"_id": {
			"$oid": "66478b9aba3359ab18c800a9"
		},
		"last_name": "Петров",
		"first_name": "Николай",
		"patronymic": "Петрович",
		"position": "Старжий менеджер",
		"salary": 15000,
		"_class": "org.example.models.Employee"
	},
	{
		"_id": {
			"$oid": "66478c30ba3359ab18c800aa"
		},
		"last_name": "Иванов",
		"first_name": "Иван",
		"patronymic": "Петрович",
		"position": "Младший менеджер",
		"salary": 13600
	},
	{
		"_id": {
			"$oid": "66478c46ba3359ab18c800ab"
		},
		"last_name": "Борщев",
		"first_name": "Петр",
		"patronymic": "Николавевич",
		"position": "Кассир",
		"salary": 23000
	}]
);

computerClub.entries.insertMany(
	[{
		"_id": {
			"$oid": "66478d08ba3359ab18c800b1"
		},
		"name": "Илья",
		"last_name": "Петрович",
		"phone": "+7(124) 124-12-32",
		"date": "23.04.23"
	},
	{
		"_id": {
			"$oid": "66478dd3ba3359ab18c800b2"
		},
		"name": "Иван",
		"last_name": "Петрович",
		"phone": "+7(124) 136-13-54",
		"date": "28.07.23"
	},
	{
		"_id": {
			"$oid": "66478de9ba3359ab18c800b3"
		},
		"name": "Николай",
		"last_name": "Валерьевич",
		"phone": "+7(125) 131-63-75",
		"date": "13.05.23"
	}]
);