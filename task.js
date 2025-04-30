const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_b1fZmw7sikQL@ep-misty-voice-a220b7b1-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
    try {
        await client.connect();

        const countResult = await client.query('SELECT COUNT(*) FROM students;');
        console.log(`\nTotal number of students: ${countResult.rows[0].count}`);

        const lowMarkResult = await client.query('SELECT * FROM students WHERE mark < 4 ORDER BY mark ASC;');
        console.log('\nStudents with mark < 4:');
        console.table(lowMarkResult.rows);

        const topStudentsResult = await client.query('SELECT * FROM students ORDER BY first_name ASC LIMIT 15;');
        console.log('\nFirst 15 students (sorted by first name):');
        console.table(topStudentsResult.rows);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

main();
