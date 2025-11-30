.PHONY: run open clean stop

# Start local dev server
run:
	@echo "Starting server at http://localhost:8080"
	@python3 -m http.server 8080

# Open in browser and run
open:
	@open http://localhost:8080 &
	@python3 -m http.server 8080

# Clean any generated files
clean:
	@rm -rf .DS_Store

# Stop server on port 8080
stop:
	@lsof -ti:8080 | xargs kill -9 2>/dev/null || echo "No server running on port 8080"
