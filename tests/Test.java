import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.lang.*;

class Test {
    public static Integer canExchangeV1(ArrayList<Integer> museumA, ArrayList<Integer> museumB) {
        ArrayList<Integer> aIsInterestedIn = new ArrayList<>();
        ArrayList<Integer> bIsInterestedIn = new ArrayList<>();
œ
        museumA.forEach((element) -> {
          if (! museumB.contains(element)) {
              bIsInterestedIn.add(element);
          }
        });

        museumB.forEach((element) -> {
          if (! museumA.contains(element)) {
              aIsInterestedIn.add(element);
          }
        });

        System.out.println(aIsInterestedIn + "\n");
        System.out.println(bIsInterestedIn + "\n");

        if  (aIsInterestedIn.size() < bIsInterestedIn.size()) {
            return aIsInterestedIn.size();
        } else {
            return bIsInterestedIn.size();
        }
    }

    public static Integer canExchangeV2(ArrayList<Integer> museumA, ArrayList<Integer> museumB) {
        List<Integer> bIsInterestedIn = new ArrayList<>(museumA);
        bIsInterestedIn.removeAll(museumB);
        
        List<Integer> aIsInterestedIn = new ArrayList<>(museumB);
        aIsInterestedIn.removeAll(museumA);
        
        System.out.println(bIsInterestedIn);
        System.out.println(aIsInterestedIn);
        
        return Math.min(
            bIsInterestedIn.size(), 
            aIsInterestedIn.size()
        );
    }

    public static void main(String[] args) {
        ArrayList<Integer> museumADuplicates = new ArrayList<> (Arrays.asList(22, 37, 16, 40, 1, 19, 35, 3, 36, 12, 15, 10, 14, 8, 31, 5));

        ArrayList<Integer> museumBDuplicates = new ArrayList<> (Arrays.asList(35, 34, 4, 8, 27, 1, 21, 40, 37, 16, 30, 5, 22, 28));

        int result1 = canExchangeV1(museumADuplicates, museumBDuplicates);

        System.out.println(result1);

        int result2 = canExchangeV2(museumADuplicates, museumBDuplicates);

        System.out.println(result2);
    }
}