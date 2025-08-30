import axios from 'axios';

const token = 'BQCP4jFkXnwdS7cgFz0-KitzQ5d0ZjBt9Rl1EDgU28-D1DNpcPmtropvCPSGavIUHXcNYE7cTad4mv-qg3RMu7lS6PU-5cc3Pb1KrZpq-YgbW-Cprq8ko5go8ntjpvcB-amE5cHp_yjbxtMQCsjrItEH9SIcjDDFyKojFVgmLZCbx_WQOIwXn8T_AMSr4QfB6i4kbt2swq1-V9BCXZaLHiR4y4SFXM6Me_SaHrkBNmXKjVKyc5hO1pVhhGsEF8qUOI89Hapi-l__t2uXgCw7ET2Lkr6xxgFnD6q-MiJdLV0XUw';

async function testRelatedArtists() {
  try {
    console.log('Testing related artists endpoint...');
    
    // Test with a known popular artist (Queen)
    const testArtistId = '1dfeR4HaWDbWq9HPk5e2bU';
    
    const response = await axios.get(`https://api.spotify.com/v1/artists/${testArtistId}/related-artists`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Related artists endpoint works!');
    console.log('Got', response.data.artists.length, 'related artists');
    console.log('First related artist:', response.data.artists[0].name);
    
  } catch (error) {
    console.error('❌ Related artists endpoint failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
  }
}

testRelatedArtists();
