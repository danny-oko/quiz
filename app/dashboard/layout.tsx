import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const articles = userId
    ? await prisma.article.findMany({
        where: { userId: userId },
        include: {
          quizzes: true,
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <SidebarProvider>
      <AppSidebar articles={articles} />
      <SidebarInset>
        <header className="flex justify-between items-center px-6 h-14 border-b bg-white shrink-0">
          <span className="font-bold text-lg tracking-tight">Quiz app</span>
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <div className="flex items-center gap-4">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-4 cursor-pointer hover:bg-[#5a3ae6] transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
