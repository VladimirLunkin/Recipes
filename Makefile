
get_pid:
	lsof -t -sTCP:LISTEN -i:30001

run:
	nohup npx expo start  --port 30001 --tunnel >> /var/log/kiru/client/recipes.log 2>&1 &
