import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbmzhiugyqpjsborosqh.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibXpoaXVneXFwanNib3Jvc3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMjk0MDMsImV4cCI6MjA1MDgwNTQwM30.VPkpqtZfNtrqvY5xjfEZfsSq95aYZSsRBnsKkp6F8mA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
