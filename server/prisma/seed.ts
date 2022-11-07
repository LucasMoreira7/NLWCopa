import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'cod2000@gmail.com',
            avatarUrl: 'https://github.com/LucasMoreira7.png'
        }
    })
    const pool = await prisma.pool.create({
        data: {
            title: 'example poo',
            code:'BOL123',
            ownerId: user.id,

            participants: {
                create:  {
                    userId: user.id
                }
            }
            
        }
    })
    await prisma.game.create({
        data: {
            date: '2022-11-02T19:56:42.369Z',   // para pagear data em time stamp: no inspencionar no browser> console> new Date().toISOString().
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T19:56:42.369Z',   // para pagear data em time stamp: no inspencionar no browser> console> new Date().toISOString().
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create: {
                    fisrtTeamPoints: 2,
                    secondTeamPoints: 1,
                    
                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()