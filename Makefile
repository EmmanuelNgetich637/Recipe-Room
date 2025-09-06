# Flask commands helper

# Environment
export FLASK_APP=backend.app:create_app
export FLASK_ENV=development

# Run the server
run:
	@flask run

# Initialize migrations folder
migrate-init:
	@flask db init

# Create a new migration (usage: make migrate msg="your message")
migrate:
	@flask db migrate -m "$(msg)"

# Apply migrations
upgrade:
	@flask db upgrade

# Rollback last migration
downgrade:
	@flask db downgrade
