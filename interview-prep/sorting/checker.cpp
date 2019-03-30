/*********************************** C++ NOT JAVASCRIPT ***********************************/
/**
 * C++ class used to rank player objects, each of which is defined by a name and a score property.
 * Its only method is a comparator which ranks any two players as ascending, equal, or descending
 * (1,0,-1 respectively), first by their score, then by their name (alphabetical order).
 */
class Checker{
public:
  	// complete this method
    static int comparator(Player a, Player b)  {
        if(a.score < b.score) return -1;
        if(a.score > b.score) return 1;
        int i;
        for(i = 0; i < a.name.length(); i++) {
            if(i == b.name.length()) return -1;
            if(a.name[i] < b.name[i]) return 1;
            if(a.name[i] > b.name[i]) return -1;
        }

        if(i < b.name.length() - 1) return 1;
        return 0;
    }
};
/******************************************************************************************/
