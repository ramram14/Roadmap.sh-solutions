/**
 * Entry point for the GitHub User Activity CLI.
 *
 * This script retrieves and displays the most recent GitHub activity events for a given username.
 * It uses the Node.js 'https' module to fetch data from the GitHub API and processes the response
 * to output a summary of up to five recent events, such as push, watch, and creation events.
 *
 * Usage:
 *   node index.js <GitHub_username>
 *
 * If no username is provided, the script will display usage instructions.
 */

const https = require('https');

const username = process.argv[2];
if (!username) {
    console.log(`
        Please provide a GitHub username as an argument.
        Example: node index.js <octocat>
        `);
} else {
    fetchGithubUserActivity(username);
}

function fetchGithubUserActivity(username) {
    const url = `https://api.github.com/users/${username}/events`;

    https.get(
        url,
        {
            headers: {
                'User-Agent': 'Node.js'
            }
        },
        (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                if (response.statusCode === 200) {
                    const events = JSON.parse(data);

                    if (events.length === 0) {
                        console.log(`No activity found for ${username}`);
                        return;
                    }

                    console.log(`\nRecent activity for ${username}:\n`);

                    // Only display the 5 most recent events
                    events.slice(0, 5).forEach((event) => {
                        if (event.type === 'WatchEvent') {
                            console.log(`- Starred ${event.repo.name}`);
                        } else if (event.type === 'PushEvent') {
                            console.log(`- Pushed ${event.payload.size} commits to ${event.repo.name}`);
                        } else if (event.type === 'CreateEvent') {
                            const refType = event.payload.ref_type;
                            const ref = event.payload.ref || '(no name)'; // Handle null ref
                            console.log(`- Created ${refType} ${ref} in ${event.repo.name}`);
                        } else {
                            // Handle other event types
                            console.log(`-${event.type} in ${event.repo.name}`);
                        }


                    });

                    // Handle not found
                } else if (response.statusCode === 404) {
                    console.log(`User ${username} not found.`);

                    // Handle other errors
                } else {
                    console.log(`Error with status code ${response.statusCode}.`);
                }
            })
        }

        // Handling errors on request
    ).on('error', (error) => {
        console.error(`Request failed: ${error.message}`);
    });
}