interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string ;
    createdAt: number;
    status: string;
}


export const seedData: SeedData = {
    entries: [
        {

            description: 'Pendiente: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, explicabo dolor? Veniam veritatis quod et dolorum, obcaecati quos laudantium reprehenderit eius, error unde blanditiis ipsa, libero iusto laboriosam aut omnis!',
            createdAt: Date.now(),
            status: 'Pending'
        },
        {
           
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, explicabo dolor? Veniam veritatis quod et dolorum, obcaecati quos laudantium reprehenderit eius, error unde blanditiis ipsa, libero iusto laboriosam aut omnis!',
            createdAt: Date.now(),
            status: 'Pending'
        },
        {
            
            description: 'InProgress Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, explicabo dolor? Veniam veritatis quod et dolorum, obcaecati quos laudantium reprehenderit eius, error unde blanditiis ipsa, libero iusto laboriosam aut omnis!',
            createdAt: Date.now() - 1000000,
            status: 'In-Progress'
        },
        {
           
            description: 'Complete Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, explicabo dolor? Veniam veritatis quod et dolorum, obcaecati quos laudantium reprehenderit eius, error unde blanditiis ipsa, libero iusto laboriosam aut omnis!',
            createdAt: Date.now() - 1000000,
            status: 'Completed'
        }
    ]
}