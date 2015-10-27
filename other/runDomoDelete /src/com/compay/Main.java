package com.compay;

import java.awt.*;
import java.io.*;
import java.util.*;
import java.util.List;

/**
 * Created by aynedelgado on 8/14/15.
 */


public class Main {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";
    public static int asciiDividerBar = 9474;
    public static char dividerBar = (char) asciiDividerBar;
    public static int designIDLength = 36;
    public static int evenRow = 2;
    public static int fileMargins = 2;
    public static String workingDir = System .getProperty("user.dir");


    public static void main(String[] args){
        String designId = null;
        String directory = null;
        String option = null;
        String option1 = "1";
        String option2 = "2";
        String option3 = "3";
        String quit = "q";
        boolean goodInput = false;

        do {
            try {
                System.out.print("\033[H\033[2J");
                System.out.flush();
                option = menu();
                if (option.equals(option1)) {
                    goodInput = true;
                    directory=promptForFileDirectory();
                    executeScriptWitFile(directory);


                }
                else if(option.equals(option2)){
                    goodInput=true;
                    System.out.print("\033[H\033[2J");
                    System.out.flush();
                    File myFile = new File("myDesignIds.txt");
                    runGetDesigns();
                    try {
                        extractDesignIds(myFile);
                        //put working directory plus myFile...
                        String allDesignsFileDirectory = workingDir+"/allDesignIds.txt";
                        executeScriptWitFile(allDesignsFileDirectory);
                        System.out.println("\n");
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }
                }
                else if (option.equals(option3)) {
                    goodInput=true;
                    designId=promptForDesignId();
                    writeDesignIdsToFile(designId);
                    executeScript();
                }
                else if(option.equals(quit)){
                    goodInput = true;
                    System.out.println(ANSI_GREEN + "Goodbye!" +ANSI_RESET);
                }
                else
                {
                   goodInput=false;
                    System.out.println(ANSI_RED + "Not a valid option. Please try again!" + ANSI_RESET);


                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        }while(goodInput==false);

    }
    public static String menu() throws IOException{

        String welcome = "DomoApps Design Clean Up Tool";
        String border = "******************************";
        String myLogo = border +"\n" + welcome + "\n" + border;
        System.out.println(ANSI_BLUE + border + "\n" + ANSI_RESET + ANSI_CYAN + welcome + "\n" + ANSI_RESET + ANSI_BLUE + border);
        System.out.println(ANSI_RESET + "Enter" + ANSI_GREEN + " 1" + ANSI_RESET + " to read in from your own file of design ids to delete");
        System.out.println(ANSI_RESET + "Enter" + ANSI_GREEN + " 2" + ANSI_RESET + " to delete all design ids from your server");
        System.out.println("Enter" + ANSI_GREEN + " 3" +ANSI_RESET+ " to manually enter a design id to delete");
        System.out.println("Enter" +ANSI_RED + " q " + ANSI_RESET+ "to quit");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String option = br.readLine();
        return option;
    }
    public static String promptForFileDirectory()throws IOException{
        String directory = null;
        System.out.println("Please enter the directory of your file, including the file name");
        System.out.println(ANSI_GREEN+"Example: /Users/me/Desktop/myDesings.txt"+ANSI_RESET);
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        directory = br.readLine();
        return directory;
    }
    public static  String promptForDesignId() throws IOException{
        String designId =" ";
        System.out.println("Please enter your design ID: ");
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        designId = br.readLine();
        return designId;
    }

    public static void runGetDesigns(){
        try{
            System.out.println("Getting design ids...");
            ProcessBuilder pb = null;
            Process p;
            String myScripts = "/scripts";
            String workingDir = System .getProperty("user.dir");
            String scriptLoc = workingDir + myScripts + "/getDesigns.sh";
            String cmd [] = {"/bin/bash", scriptLoc};
            pb = new ProcessBuilder(cmd);
            pb.directory(new File(workingDir));
            p=pb.start();
            p.waitFor();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public static void writeAllDesignIdsToFile(java.util.List<String> designIdsList){
        try{
            PrintWriter writer = new PrintWriter("allDesignIds.txt", "UTF-8");
            for(String id:designIdsList){
                writer.println(id);

            }
            writer.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
    public static void extractDesignIds(File myFile) throws FileNotFoundException{

        try {

            Scanner scan = new Scanner(myFile);
            //skip first 3 lines
            scan.nextLine();
            scan.nextLine();
            int count = 3;
            List<String> designIdsList = new ArrayList<String>();
            while(scan.hasNextLine()){
                String line = scan.nextLine();
                if(count%evenRow == 0){
                    String substr = line.substring(fileMargins);
                    int i=0;
                    String designId = null;
                    i = findDesignId(substr);

                    String withoutName = substr.substring(i);
                    designId = withoutName.substring(0,designIDLength);
                    designIdsList.add(designId);
                    //System.out.println(designId);

                }
                count++;

            }
//            for(String id:designIdsList)
//                System.out.println(id);
            System.out.print("\033[H\033[2J");
            System.out.flush();
            System.out.println("\rDesigns have been read...");
            writeAllDesignIdsToFile(designIdsList);


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
    public static int findDesignId(String substr){
        int i=0;
        while(i<substr.length())
        {
            char theChar = substr.charAt(i);
            if (theChar==dividerBar){
                break;
            }
            i++;
        }
        i+=fileMargins;
        return i;
    }
    public static void executeScriptWitFile(String directory){
        try{

            ProcessBuilder pb = null;
            Process p;
            String myScripts = "/scripts";
           //
           // String workingDir = System .getProperty("user.dir");
            //System.out.println(""+workingDir);
            String myFile = directory;
            String scriptLoc = workingDir + myScripts + "/deleteDesignId.sh";
            //System.out.println(scriptLoc);
            //System.out.println(myFile);
            String cmd [] = {"/bin/bash", scriptLoc, myFile};
            pb = new ProcessBuilder(cmd);
            pb.directory(new File(workingDir));
            System.out.print("\033[H\033[2J");
            System.out.flush();
            System.out.println("\rDeleting design ids...");
            p=pb.start();
            p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            System.out.print("\033[H\033[2J");
            System.out.flush();
            System.out.println("\rFinished!");
            String line = " ";
            while((line=reader.readLine())!=null){
                if (line.startsWith("X")){
                    System.out.print(ANSI_RED + line + "\n" + ANSI_RESET);
                }
                else{
                System.out.print(line + "\n");
                }
            }
            reader.close();

           // System.out.println("\nFinished execution...");




        }
        catch (Exception e){
            e.printStackTrace();
        }
    }


    //writes design Ids to a file
    public static void writeDesignIdsToFile(String designId){
        try{
            PrintWriter writer = new PrintWriter("designIds.txt", "UTF-8");
            writer.println(designId);
            writer.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }
    public static void executeScript(){
        try{

            ProcessBuilder pb = null;
            Process p;
            String myScripts = "/scripts";
           // String workingDir = System .getProperty("user.dir");
            System.out.println(""+workingDir);
            String myFile = workingDir + "/designIds.txt";
            String scriptLoc = workingDir + myScripts + "/deleteDesignId.sh";
            System.out.println(scriptLoc);
            System.out.println(myFile);
            String cmd [] = {"/bin/bash", scriptLoc, myFile};
            pb = new ProcessBuilder(cmd);
            pb.directory(new File(workingDir));
            p=pb.start();
            p.waitFor();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

            String line = " ";
            while((line=reader.readLine())!=null){
                if (line.startsWith("X")){
                    System.out.print(ANSI_RED + line + "\n" + ANSI_RESET);
                }
                else{
                    System.out.print(line + "\n");
                }
            }
            reader.close();

            System.out.println("\nFinished execution...");




        }
        catch (Exception e){
            e.printStackTrace();
        }
    }



}

