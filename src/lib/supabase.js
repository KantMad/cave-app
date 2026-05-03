import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgekvgcshvhhqrzmouex.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZWt2Z2NzaHZoaHFyem1vdWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTY0NDgsImV4cCI6MjA5MjQzMjQ0OH0.E1t1wcG5kjG7wGyvAROhO8aT5o0CqX-cXMa07TVtQaM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
