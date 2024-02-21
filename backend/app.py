from src import config, app
from src.models import create_tables

create_tables(app)

if __name__ == "__main__":
    app.run(host= config.HOST,
            port= config.PORT,
            debug= True)