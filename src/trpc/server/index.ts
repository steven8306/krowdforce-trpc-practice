import { Role } from '@/util/types'
import { TRPCError, initTRPC } from '@trpc/server'
import { authorizeUser } from './util'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/db'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()

  return {
    db: prisma,
    session,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const protectedProcedure = (...roles: Role[]) =>
  publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.session?.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Sign in to access this data.',
      })
    }

    await authorizeUser(ctx.session.userId, roles)

    return next({ ctx: { ...ctx, userId: ctx.session.userId } })
  })
