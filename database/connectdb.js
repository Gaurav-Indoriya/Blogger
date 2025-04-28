const { Sequelize } = require('sequelize');

const connectdb = new Sequelize('defaultdb', 'avnadmin', 'AVNS_31jwpoVvkqilkfK1k60', {
  host: 'gaurav-mysqldb-gaurav-developer.g.aivencloud.com',
  port: 25876,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      ca: `
-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUTmwQVxf3VxicMyvh99vteeP8vtswDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1NTFkYmM0MzUtZjRjZS00NDk4LWIxZjItMDY5ODk5YWE2
Y2U4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNDI0MTAwNjAyWhcNMzUwNDIyMTAw
NjAyWjBAMT4wPAYDVQQDDDU1MWRiYzQzNS1mNGNlLTQ0OTgtYjFmMi0wNjk4OTlh
YTZjZTggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAORrx4kv0FFYMc0JHvRUC8H8fQ0slO4vLOpQ+d1eahTdzUVQU+UWTebI
p+auck4882L2ZLzaqXRLQAZ9F4/Ms7UC03fNucHOFcrWnxN/wmw/AyUWqslvr5pH
Pl6euryH38/lCX3vW/AdJFoB+EKAvXc4JvwkZq61hTl8ygyEkoxTsFoEKLzXfheq
IlqWQMRQoFrfQMng2X0k+xxo5cKPGG5OKoP91jqSSarHOhzmqbKArCflApRdkjM7
HUOPilmSKOqUOixSH04m2G0Vzg5J5wejsaoRHi0qEjb9vb7Fee9WrqMquRcRVTdg
FYs4Ye1dFCBIkjK1yNPjzN+CtQzrCM+6j9ByjThOX7DdBsHYm70x54hqLOpsKsYz
/NfvJpyxDRsGPFQ3X7iYROsA9+nzC5ULPHu/IxVpFuv2TRA/90pAUMO1Lj3XvH3L
9iAKd7dwj36hZs0geZmbOyECX8AxXDSSXrrpJm7716qRW4ZGhjW0n3b/mWjZxpJA
LVlX3aPeBQIDAQABoz8wPTAdBgNVHQ4EFgQU+1IMIZDeqa5QZrTjgLwpCa2Cmxgw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AFwdcn2u75c5tshCShwjhrAxNuRudWi4gK7dsrF/7vef9nGZf9IvoDHlWtJtCWb1
OeZa/i7YqNZYhCB58rJxXYsksItr8T3ImcuOwhSCDm6FwgK/WrWwJhHDTVVy2dKw
U/1lbVEm4TCxj6UiGYp++BILoBtE4GIkJpc7nOwEGQiXksmvJ3k98YQXCPIDeYqi
O0nu0EX8sFgxWwazreK0BUvJ5QF0lLclAlBMzjNr1XvhFFMhgiJUSgyuFSTIUIrs
uCQZjEjPRjLV4DSiVxspeanYLWkKMhL77fjMqrHmhTm7UJhgL2nZagpNz8D/EjL2
PXJBUpTJZqunRqpn+dmA55fPjYlsPG6ImywsVFycDi70IlvcerT0hWAEYeZBjXyS
R5MWNhdd1oGk6y6aSVoGGfWCagtaRG6YmQFBtwZ2NksoCpWG8eqjocX1e+KqsIny
vFgn4EXcbbVTeDYF5byDugOtnfCoHa2nH0dGVXPsD5llh5HbgPuaPiQAdLePg3Zm
aw==
-----END CERTIFICATE-----

      `
    }
  }
});

module.exports = connectdb;
