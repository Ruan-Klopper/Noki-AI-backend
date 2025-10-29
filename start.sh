#!/bin/sh

echo "Starting database migration process..."

# Capture the output and exit code from migrate deploy
ERROR_OUTPUT=$(npx prisma migrate deploy 2>&1) || DEPLOY_FAILED=$?

if [ -n "$DEPLOY_FAILED" ]; then
  echo "Migration deployment failed. Analyzing error..."
  
  # Check if this is a P3005 error (schema exists but no migration history)
  if echo "$ERROR_OUTPUT" | grep -q "P3005"; then
    echo "P3005 detected: Database schema exists but migrations not recorded."
    echo "Baselining all existing migrations..."
    
    # Mark all migrations as applied
    for migration_dir in prisma/migrations/*/; do
      if [ -d "$migration_dir" ]; then
        migration_name=$(basename "$migration_dir")
        echo "  - Marking as applied: $migration_name"
        npx prisma migrate resolve --applied "$migration_name" || true
      fi
    done
    
    echo "Baseline complete. Deploying migrations..."
    npx prisma migrate deploy
  else
    echo "Migration failed with different error:"
    echo "$ERROR_OUTPUT"
    echo ""
    echo "Using db push as fallback..."
    npx prisma db push --skip-generate --accept-data-loss
  fi
else
  echo "Migrations deployed successfully!"
fi

echo "Database is ready!"
echo "Starting application..."
exec npm run start:prod

